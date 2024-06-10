import React, { useState } from "react";

type FileUploaderProps = {
  file?: File;
};

const FileUploader = ({ file: initialFile }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(initialFile || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("csv_file", file);

    try {
      const response = await fetch("http://localhost:8000/api/upload-file", {
        method: "POST",
        headers: {
          Accept: 'application/json'
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Falha no upload");
      }

      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Escolha um arquivo
        </label>
        <input id="file" type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          <p className="pb-6">Detalhes do arquivo:</p>
          <ul>
            <li>Nome: {file.name}</li>
            <li>Tipo: {file.type}</li>
            <li>Tamanho: {file.size} bytes</li>
          </ul>
        </section>
      )}
      {file && (
        <button
          className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Fazer upload do arquivo"}
        </button>
      )}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Upload bem-sucedido!</p>}
    </div>
  );
};

export { FileUploader };
