import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";

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
        <Table>
            <TableCaption>Arquivos Carregados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Data de envio</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((file: any) => (
                <TableRow key={file.id}>
                  <TableCell>{file.id}</TableCell>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      )}
    </div>
  );
};

export { UploadedFilesViewer };