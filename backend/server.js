import fetch from "node-fetch";
import Fastify from "fastify";
import { validateRecord } from "./validity.js";
import dotenv from "dotenv";
import fastifyCors from "fastify-cors";

dotenv.config({ path: ".env" });

const fastify = Fastify();
fastify.register(fastifyCors);

fastify.listen(process.env.SERVER_PORT || 3005, "0.0.0.0", (err) => {
  if (err) throw err;
});

fastify.get("/api/records/", async (request, reply) => {
  try {
    fetch("http://db:3010/db/records/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        console.log(response);
        reply.send(await response.json());
      })
      .catch((e) => {
        console.log(e);
        reply.send(JSON.stringify({ error: e.toString() }));
      });
  } catch (e) {
    console.log(e);
  }
});

fastify.delete("/api/records/:recordId", async (request, reply) => {
  const recordId = request.params.recordId;
  try {
    fetch(`http://db:3010/db/records/${recordId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        reply.send(await response.json());
      })
      .catch((e) => {
        console.log(e);
        reply.send(JSON.stringify({ error: e.toString() }));
      });
  } catch (e) {
    console.log(e);
  }
});

fastify.put("/api/records/", async (request, reply) => {
  const reqRecord = request.body;
  const validation = validateRecord(reqRecord);
  if (!validation.valid) {
    reply.send(JSON.stringify({ error: validation.message }));
    return;
  }
  const record = reqRecord;

  try {
    fetch(`http://db:3010/db/records/`, {
      method: "PUT",
      body: JSON.stringify(record),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        reply.send(await response.json());
      })
      .catch((e) => {
        console.log(e);
        reply.send(JSON.stringify({ error: e.toString() }));
      });
  } catch (e) {
    console.log(e);
    reply.send(JSON.stringify({ error: e.toString() }));
  }
});
