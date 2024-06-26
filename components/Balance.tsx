import getUserBalance from "@/app/actions/getBalance";
import { currentFormatter } from "@/lib/utils";

const Balance = async () => {
    const {balance} = await getUserBalance();

    return (<>
        <h4>Your Balance</h4>
        <h1>GMD4{currentFormatter(balance ?? 0)}</h1>
    </>);
}
 
export default Balance;