import app from "./app";
const port = 8000;
app.app.listen(port, () => {
    console.log("SERVER RUNNING PORT PORT " + port);
});
export default app;