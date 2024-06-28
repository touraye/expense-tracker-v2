'use client';

import addTransaction from "@/app/actions/AddTransaction";
import { useRef } from "react";
import { toast } from "react-toastify";

const AddTransaction = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleClientAction = async (formData: FormData) => {
        const { data, error } = await addTransaction(formData);
        
        // toast if error
        if (error) {
            return toast.error(error);
        } else {
            toast.success('Transaction added');
            formRef.current?.reset();
        }
                
    }

    return (<>
        <h3>Add Transaction</h3>
        <form ref={formRef} action={handleClientAction}>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" name="text" id="text" placeholder="Enter Text" />
            </div>

            <div className="form-control">
                <label htmlFor="amount">Amount <br /> (negative - expense, positive income)</label>
                <input type="number" name="amount" id="amount" placeholder="Enter amount" step='0.01' />
            </div>

            <button className="btn">Add Transaction</button>
    </form> 
    </>);
}
 
export default AddTransaction;