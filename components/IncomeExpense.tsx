import getIncomeExpense from "@/app/actions/getIncomeExpense";
import { currentFormatter } from "@/lib/utils";

const IncomeExpense = async () => {
    const { income, expense } = await getIncomeExpense();

    return (<div className="inc-exp-container">
        <div>
            <h4>Income</h4>
            <div className="money plus">GMD{currentFormatter(income ?? 0)}</div>
        </div>

        <div>
            <h4>Expense</h4>
            <div className="money minus">GMD{currentFormatter(expense ?? 0)}</div>
        </div>
    </div>);
}
 
export default IncomeExpense;