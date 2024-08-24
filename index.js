import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference} from "mercadopago";


const client = new MercadoPagoConfig({accessToken: "COLOQUEN API KEY"})


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.send(" Soy el server :) ");
});

app.listen(port,()=>{
    console.log(`Escuchando en el puerto${port}`);
});

app.post("/create_preferences", async (req,res)=>{
    try {
        const body ={
            items:[
                {
                    //TODO:EJEMPLO
                    // title: req.body.title,
                    // quantity: Number(req.body.quantity),
                    // unit_price: Number(req.body.price),
                    // currency_id: "CLP"

                    title: "Zapatillas",
                    quantity: Number(2),
                    unit_price: Number(100),
                    currency_id: "CLP"
                }
            ],
            back_urls: {
                success:"https://www.SuPaginaBlaBla.cl/success",
                failure:"https://www.SuPaginaBlaBla.cl/failure",
                pending:"https://www.SuPaginaBlaBla.cl/pending",
            },
            auto_return:"approved"
        };

        const preferences = new Preference(client);
        const result = await preferences.create({body});
        console.log(result);
        // res.json({
        //     url:result.sandbox_init_point
        // });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"Error al crear la preferencia"
        });
    }

});