import TransactionItem from "./TransactionItem";
import getTransaction from "@/app/actions/getTransactions";
import { Transaction } from "@/types/Transaction";

const TransactionList = async () => {
    const { transactions ,error } = await getTransaction();
    
    if (error) {
        return <p className="error">{error}</p>
    }

    return (<>
        <h4>History</h4>
        <ul className="list">
            {
                transactions &&
                transactions.map((transaction: Transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))
            }
        </ul>

    </>);
}
 
export default TransactionList;