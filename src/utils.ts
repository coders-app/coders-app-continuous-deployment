import http from "http";

export const respondWithNotFoundError = (
  res: http.ServerResponse<http.IncomingMessage>
) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found.");
};

export const respondWithOk = (
  res: http.ServerResponse<http.IncomingMessage>
) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Webhook request processed.");
};
