import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/components/Guest";

const HomePage = async () => {
  const user = await currentUser();
  if (!user) {
  return <Guest />
}

  return (<main>
    <h2>Welcome, {user.firstName}</h2>
  </main> );
}
 
export default HomePage;