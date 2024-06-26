'use server';

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface Transaction {
    text: string,
    amount: number,
}

interface TransactionResult {
    data?: Transaction,
    error?: string,
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
    const textValue = formData.get('text')
    const amountValue = formData.get('amount')

    // check for input
    if (!textValue || textValue === '' || !amountValue) {
        return {error: 'Text or amount is missing'}
    }

    // extract correct type
    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString())

    // get the logged in user
    const { userId } = auth();
    
    // check for user
    if (!userId) {
        return {error: ''}
    }
    
    try {
        // create an transaction
        const transaction: Transaction = await db.transaction.create({
            data: {
                text,
                amount, 
                userId
            }
        })
    
        revalidatePath('/');
        return { data: transaction };
        
    } catch (error) {
        return {error: 'Fail to add transaction'}
    }
}

export default addTransaction;