import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import tableDataMun from './data/tableDataMun.json'
import tableDataUF from './data/table_Data.json'
import './App.css';


function App() {
  const [values, setValues] = useState([]);
  const [selectedUF, setSelectedUF] = useState();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  

  function transformToObjectArray(data) {
    const array = [];
  
    for (let municipio in data) {
      for (let conta in data[municipio]) {
        const valor = data[municipio][conta];
        array.push({ municipio, conta, valor });
      }
    }
    const newArray = array.map((item) => {
      return {
        municipio: item.municipio,
        conta: item.conta,
        valor: item.valor,
      };
    });
    const result = []

    newArray.map((valor) => {
      for (let coluna in valor.valor) {
        for (let despesa in valor.valor[coluna]) {
          console.log(coluna)
          result.push({municipio: valor.conta, coluna, despesa, valor: valor.valor[coluna][despesa]})
        }
      }
    })
    return result
  }
  
  
  function transformarObjeto(objeto) {
    const municipio = objeto.conta;
    const contaValor = [];
  
    for (const [conta, valor] of Object.entries(objeto.valor)) {
      contaValor.push({ municipio, conta, valor });
    }
  
    return contaValor;
  }

  const filtrar = () => {
    setLoading(true)
    setTimeout(() => {
      
      const rows = []
      if (selectedUF && checked) {
      for (let i = 0; i < Object.keys(tableDataUF.Conta).length; i++) {
        const row = {};

        // adiciona cada valor da linha no novo objeto
        Object.keys(tableDataUF).forEach((key) => {
          row[key] = tableDataUF[key][i];
        });
        if (selectedUF) {
          if (row['UF'] === selectedUF) rows.push(row)
        }
      }

      setValues(rows);
    } else if (selectedUF && !checked) {
      setValues(transformToObjectArray({[selectedUF]: tableDataMun[selectedUF]}))
    }
    setLoading(false)
  }, 100);
  }

  return (
    <div>

      <header>

        <h2 className="h2-header">Contabilidade de Custos e Gerencial</h2>
        <h4 className="h4-header">Insira abaixo o UF do qual deseja obter informações, e caso queira filtre um múnicipio específico:</h4>
        <div className="form">
          <Dropdown value={selectedUF} onChange={(e) => setSelectedUF(e.value)} options={[
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RR',
            'RO',
            'RJ',
            'RN',
            'RS',
            'SC',
            'SP',
            'SE',
            'TO']} placeholder="Selecione Estado"
            filter className="w-full md:w-14rem" />

            <div style={{display: 'flex', flexDirection: 'row'}}>
              <InputSwitch checked={checked} onChange={(e) => {
                setValues([])
                setChecked(e.value)
              }} />
              <label style={{paddingTop: 5, paddingLeft: 10}}>Mostrar apenas UF</label>
            </div>

          <button type="submit" className="button-header" id="button_municipio" onClick={filtrar}>Visualizar tabela</button>
        </div>

      </header>


      <main id="main">

        {loading ? <label>Aguarde...</label> : <div>
          {checked ? <DataTable value={values} tableStyle={{ minWidth: '50rem', width: '100%' }}>
            <Column field="UF" header="UF" alignHeader='left'></Column>
            <Column field="Conta" header="Conta" sortable alignHeader='left'></Column>
            <Column field="Coluna" header="Despesa" alignHeader='left'></Column>
            <Column field="Valor" header="Valor" align="right" alignHeader='right' body={(el) => <div style={{ textAlign: 'right' }}>{Number(el.Valor).toFixed(2)}</div>}></Column>
          </DataTable> :
            <DataTable value={values} tableStyle={{ minWidth: '50rem', width: '100%' }}>
              <Column field="municipio" sortable filter filterPlaceholder="Pesquisar pelo Município" header="Município" alignHeader='left'></Column>
              <Column field="coluna" header="Conta" alignHeader='left'></Column>
              <Column field="despesa" header="Despesa" alignHeader='left'></Column>              
              <Column field="valor" header="Valor" align="right" alignHeader='right' body={(el) => <div style={{ textAlign: 'right' }}>{el.valor.toFixed(2)}</div>}></Column>
            </DataTable>
          }
        </div>}

      </main>

      <footer>
        <h4>
          Projeto desenvolvido por <a className="a-footer" href="https://github.com/geovannaadomingos"
            target="_blank">Geovanna
            Domingos</a>,
          <a className="a-footer" href="https://github.com/gustavo-ghcs" target="_blank">Gustavo de Hollanda</a>, <a
            className="a-footer" href="https://github.com/higorcunha1" target="_blank">Higor Cunha</a>, <a
              className="a-footer" href="https://github.com/Madu218" target="_blank">Maria Melo</a> e <a
                className="a-footer" href="https://github.com/PedroSouza157998" target="_blank">Pedro Souza</a>.
        </h4>
      </footer>

    </div>
  );
}

export default App;
