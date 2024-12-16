import * as React from "react";

import html2pdf from "html2pdf.js";
import { IGenerarPdfProps } from "./IGenerarPdfProps";
import { Loading } from "../../componentes/Loading";
import { MsgError } from "../../componentes/MsgError";
import { MsgSuccess } from "../../componentes/MsgSuccess";

const GenerarPdf: React.FunctionComponent<IGenerarPdfProps> = (props: IGenerarPdfProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const item = Office.context.mailbox.item;
    const de = `<span style="font-weight:bold">DE: </span>${item.from.emailAddress}`;
    const para = `<span style="font-weight:bold">PARA: </span>${item.to.map((i) => i.emailAddress)}`;
    const cc = `<span style="font-weight:bold">CC: </span>${item.cc.map((i) => i.emailAddress)}`;
    const fecha = `${item.dateTimeCreated.toLocaleString()}`;
    const encabezado = `<div><p>${de}<br/>${para}<br/>${cc}<br/>${fecha}</p><p>---</p></div>`;

    item.body.getAsync(Office.CoercionType.Html, (result) => {
      if (result.status == Office.AsyncResultStatus.Succeeded) {
        const opt = {
          margin: 1,
          filename: "email_pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        const htmlStr = encabezado + result.value;
        html2pdf()
          .set(opt)
          .from(htmlStr)
          .toPdf()
          .output("blob")
          .then((data: Blob) => {
            props.onPdfGenerado(new File([data], `email_${new Date().getTime().toString()}.pdf`));
            setIsLoading(false);
          })
          .catch(() => {
            //setIsLoading(false);
            setHasError(true);
          });
      }
    });
  }, []);
  console.log(isLoading);
  console.log(hasError);
  return (
    <>
      {isLoading && !hasError && <Loading message="Generando evidencia..." />}
      {!isLoading && hasError && <MsgError message="Error al generar evidencia" />}
      {!isLoading && !hasError && <MsgSuccess message="PDF con evidencia generado" />}
    </>
  );
};

export default GenerarPdf;
