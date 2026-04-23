import React, { useState, useEffect } from 'react'
import './App.css'

const baseUrl = 'http://project.bzzyvc.nhely.hu/api.php';
const allTables = ["eredmenyek", "gp", "pilota"];

const tableStyle = { border: "1px solid #a1a1a1", padding: "2px" };
const cellStyle = { border: "1px solid #a1a1a1", padding: "8px" };
const linkStyle = { color: "-webkit-link", textDecoration: "underline", cursor: "pointer" };
const editFormStyle = { display: "block" };
const editFormRowStyle = {
  display: "flex",
  justifyContent: "center",
  alignContent: "stretch",
  flexWrap: "wrap",
  alignItems: "flex-start",
  flexDirection: "column"
};

function App() {
  const [data, setData] = useState({});
  const [selectedTable, setSelectedTable] = useState(allTables[0]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [editEnabled, setEditEnabled] = useState(false);
  const [headerCount, setHeaderCount] = useState(0);

  const getData = (table) => {
    fetch(baseUrl + "?table=" + table, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((data) => {
      data.json().then(a => {
        setData(a);
        if (a.length > 0) {
          setHeaderCount(Object.keys(a[0]).length + 2);
        }
      });
    });
  }

  useEffect(() => {
    getData(selectedTable);
  }, [selectedTable]);

  const createData = (e, selTable) => {
    e.preventDefault();

    if (data && data.length > 0) {
      const keys = Object.keys(data[0]);

      const bodyObj = {};

      for (let i = 0; i < headerCount - 3; i++) {
        bodyObj[keys[i + 1]] = e.target[i].value;
      }

      fetch(baseUrl + "?table=" + selTable, {
        method: "POST",
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bodyObj)
      }).then((r) => {
        if (r.status == 200) {
          getData(selTable);
          alert("Adat sikeresen hozzaadva");
        }
      })

    }

  }

  const editData = (e, selectedObj, selTable) => {
    e.preventDefault();
    const bodyObj = {};

    if (selectedObj["az"]) {
      bodyObj.az = selectedObj["az"];
    }
    else {
      bodyObj.id = selectedObj["id"];
    }

    for (let i = 0; i < headerCount - 3; i++) {
      bodyObj[Object.keys(selectedObj)[i + 1]] = e.target[i].value;
    }

    fetch(baseUrl + "?table=" + selTable, {
      method: "PUT",
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(bodyObj)
    }).then((r) => {
      if (r.status == 200) {
        setEditEnabled(false);
        getData(selTable);
      }
    })

  };

  const deleteData = (table, obj) => {
    fetch(`${baseUrl}?table=${selectedTable}&${obj.az ? "az" : "id"}=${obj.az ? obj.az : obj.id}`, {
      method: "DELETE",
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((data) => {
      if (data.status === 200) {
        getData(table);
      }
    });
  };

  return (
    <>
      <select
        name="tables"
        id="table"
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="eredmenyek">Eredmenyek</option>
        <option value="gp">Grand Prix</option>
        <option value="pilota">Pilota</option>
      </select>
      <div className="read">
        <form style={editFormStyle} onSubmit={(e) => createData(e, selectedTable)}>
          <label>Adat hozzáadása a {selectedTable} táblába</label>
          {Array.isArray(data) && data.length > 0 ? Object.keys(data[0]).map((key, keyIndex) => {
            if (key != 'id' && key != 'az') {
              return (
                <div style={editFormRowStyle} key={`${key}-div`}>
                  <label style={{ margin: "4px" }} key={`${key}-label`}>{key}</label>
                  <input style={{ width: "50%", margin: "4px" }} key={`${key}-input`} type='text' placeholder='Ide ird be a mező értékét...'></input>
                  {keyIndex === headerCount - 3 ?
                    <button style={{ margin: "4px" }} type="submit"><span>Hozzáad</span></button>
                    : <></>}
                </div>
              );
            }
            return null;
          })
            :
            null
          }
        </form>

        <table style={tableStyle}>
          <thead>
            <tr>
              {Array.isArray(data) && data.length > 0 ? Object.keys(data[0]).map((key) => {
                return (
                  <th key={key} style={cellStyle}>
                    {key}
                  </th>
                )
              })
                :
                null
              }
              <th style={cellStyle}>Szerkesztés</th>
              <th style={cellStyle}>Törlés</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? data.map((v, i) => {
              return (<React.Fragment key={i}>
                <tr>
                  {Object.values(v).map((value, valIndex) => (
                    <td key={valIndex} style={cellStyle}>
                      {value === null || value === "" ? "—" : value.toString()}
                    </td>
                  ))}
                  <td style={cellStyle}>
                    <a style={linkStyle} onClick={(e) => {
                      setEditEnabled(!editEnabled);
                      setSelectedElement(v);
                    }}>Szerkesztés</a>
                  </td>
                  <td style={cellStyle}>
                    <a style={linkStyle} onClick={() => deleteData(selectedTable, v)}>Törlés</a>
                  </td>
                </tr>
                {editEnabled && selectedElement == v ?
                  <tr>
                    <td colSpan={headerCount}>
                      <form style={editFormStyle} onSubmit={(e) => editData(e, selectedElement, selectedTable)}>
                        {Array.isArray(data) && data.length > 0 ? Object.keys(data[0]).map((key, keyIndex) => {
                          if (key != 'id' && key != 'az') {
                            return (
                              <div style={editFormRowStyle} key={`${key}-div`}>
                                <label style={{ margin: "4px" }} key={`${key}-label`}>{key}</label>
                                <input style={{ width: "50%", margin: "4px" }} key={`${key}-input`} type='text' placeholder='Ide ird be a módosítani kívánt mező értékét...' defaultValue={v[key]}></input>
                                {keyIndex === headerCount - 3 ?
                                  <button style={{ margin: "4px" }} type="submit"><span>Alkalmaz</span></button>
                                  : <></>}
                              </div>
                            );
                          }
                          return null;
                        })
                          :
                          null
                        }
                      </form>
                    </td>
                  </tr>
                  : null}
              </React.Fragment>)
            })
              :
              null
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
