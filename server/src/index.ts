import * as server from "./services/server.service";

const PORT: number = 44405;

const main = (): void => {
    server.init(PORT);
}
main();
