import { NextFunction, Request, Response, Router } from "express";
import { createCustomer, editCustomer, getAllCustomers, getCustomer, removeCustomer } from "../controllers/customer";
import { Customer } from "../db/entities/Customer";

const router = Router()


router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const payload: Customer = req.body;

    if (!payload.name || !payload.mobilePhone || !payload.balance) {
        res.json({
            message: "Some fields are missing!",
            success: false
        })
        return
    }
    try {
        const task = await createCustomer(payload)
        res.json({
            message: "Customer created successfully",
            success: true
        })

    } catch (err) {
        console.log("error" + err);
        next(err)

    }

})



router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    try {
        const customer = await removeCustomer(id)

        res.json({
            message: "Customer deleted successfully",
            success: true
        })
    } catch (err) {
        console.log("error" + err);
        next(err)
    }
})


router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {

    const id = Number(req.params.id);
    const payload: Customer = req.body;

    try {
        const customer = await editCustomer(id, payload)

        res.json({
            message: "Customer details updated successfully",
            success: true
        })
    } catch (err) {
        console.log("error" + err);
        next(err)
    }
})


router.get("/", getAllCustomers)

router.get("/:id", getCustomer)

export default router