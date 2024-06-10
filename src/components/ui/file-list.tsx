import React, { useState, useEffect } from "react";

const UploadedFilesViewer = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8000/api/uploaded-files");
        if (!response.ok) {
          throw new Error("Falha ao carregar os dados");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Ocorreu um erro: {error}</p>}
      {data && (
        <div>
          <h2>Arquivos Carregados</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Caminho Real</th>
                <th>Status</th>
                <th>Criado em</th>
                <th>Atualizado em</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((file: any) => (
                <tr key={file.id}>
                  <td>{file.id}</td>
                  <td>{file.name}</td>
                  <td>{file.real_path}</td>
                  <td>{file.status}</td>
                  <td>{file.created_at}</td>
                  <td>{file.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export { UploadedFilesViewer };