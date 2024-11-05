import { getContacts } from "@/lib/actions/contact.actions";
import { ContactBoard } from "../../components/ContactBoard";
import { ContactForm } from "../../components/ContactForm";
import { ContactProps } from "@/types";
import { cookies } from "next/headers";

export default async function Home() {
  const token = cookies().get('session')?.value

  // const contacts: ContactProps[] = await getContacts()

  const contactsData = await fetch('https://apiphonestream-production.up.railway.app/phone', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const plainData = JSON.parse(JSON.stringify(contactsData))

  console.log(plainData)

  return (
    <div className="h-screen w-screen flex py-10 px-10">

      <div className="w-screen flex justify-center gap-20">
        <div className="h-4/5 mt-8">
          <ContactForm />
        </div>

        {/* <ContactBoard contacts={plainData} /> */}
      </div>

      {/* <Link href="/map">
        <button className="w-72 h-10 self-center bg-white rounded-md hover:bg-green-400 hover:text-zinc-100">Map</button>
      </Link> */}
    </div>
  );
}
