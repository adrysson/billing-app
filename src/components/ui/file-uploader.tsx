import React, { useState } from "react";

type FileUploaderProps = {
  file?: File;
}
const FileUploader = ({ file: initialFile }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(initialFile || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className = "flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Escolha um arquivo
        </label>
        <input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" onChange={handleFileChange} />
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

      {file && <button className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold">Fazer upload do arquivo</button>}
    </div>
  );
};

export { FileUploader };
