import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auh";

const http = httpRouter();

authComponent.registerRoutes(http, createAuth);

export default http;
