import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtMessage = "Carregando...";

  if (!isLoading && data) {
    updatedAtMessage = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última vez atualizado em: {updatedAtMessage}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let databaseInfo = "Carregando...";

  if (!isLoading && data) {
    const { version, max_connections, opened_connections } =
      data.dependencies.database;

    databaseInfo = (
      <>
        <div>Versão: {version}</div>
        <div>Conexões abertas: {opened_connections}</div>
        <div>Conexões máximas: {max_connections}</div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseInfo}</div>
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Carregando status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}
