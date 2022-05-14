import { useEffect, useMemo, useState } from "react";
import { ToggleOffOutlined, ToggleOnOutlined } from "@mui/icons-material";
import { Table } from "./components/Table";
import { getAllCultural } from "./services/v1/cultural-service";

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedNumberFilter, setSelectedNumberFilter] = useState(5);

  async function tryGetAllCultura() {
    //LOADING TRUE
    const culturalsTotal = await getAllCultural({
      pageNumber: 1,
    });

    const culturals = await getAllCultural({
      pageNumber: 1,
      pageLimit: selectedNumberFilter,
    });
    setData(culturals);
    setCount(culturalsTotal.length);
  }

  async function getCultura() {
    try {
      await tryGetAllCultura();
    } catch (e) {
      console.log(e);
    } finally {
      // LOADING FALSE
    }
  }

  useEffect(() => {
    (async () => {
      await getCultura();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNumberFilter]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleUpdateStatus(id, status) {
    const findIndexData = data.findIndex((item) => item.id === id);
    data[findIndexData].status = !status;
    setData((prevState) => [...prevState]);
  }

  const columns = useMemo(
    () => [
      {
        Header: () => <input type="checkbox" />,
        accessor: "checkbox", // accessor is the "key" in the data
        Cell: () => <input type="checkbox" />,
      },
      {
        Header: "Ativo",
        accessor: "status", // accessor is the "key" in the data
        Cell: ({ row }) => (
          <div
            onClick={() =>
              handleUpdateStatus(row.original.id, row.original.status)
            }
          >
            {row.original.status ? <ToggleOnOutlined /> : <ToggleOffOutlined />}
          </div>
        ),
      },
      {
        Header: "Nome da Cultura",
        accessor: "nomeCultura", // accessor is the "key" in the data
      },
      {
        Header: "Nome Científico",
        accessor: "nomeCientifico",
      },
      {
        Header: "Situação",
        accessor: "situacao",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>Mostrar</div>
      <select
        onChange={(e) => setSelectedNumberFilter(e.target.value)}
        defaultValue={selectedNumberFilter}
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <Table data={data} columns={columns} buttonAdd />
      <span>
        Mostrando {data.length} de {count}
      </span>
    </div>
  );
}

export default App;
