"use client";
import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import { useState } from "react";
import Integrations from "@/app/components/integration-ui/integrations";
import {AuthenticatedConnectUser} from "@useparagon/connect";
import {Footer} from "@/app/components/Footer";

export default function Home() {
    const [intgDropdown, setIntgDropdown] = useState<boolean>(false);
    const [user, setUser] = useState<AuthenticatedConnectUser | null>(null);

    function toggleDropdown(){
        setIntgDropdown(!intgDropdown);
    }

    return (
        <main className="pt-10 flex justify-center items-center background-gradient">
            <div className="flex-col space-y-2 lg:space-y-10 w-[90%] lg:w-[60rem]">
                <Header toggle = {toggleDropdown} toggleDown={intgDropdown} user={user} setUser={setUser}/>
                {intgDropdown && <Integrations user={user} setUser={setUser}/>}
                {user &&
                    <div className="h-[65vh] flex">
                        <ChatSection user={user} />
                    </div>
                }
                {!user &&
                    <div className="h-[65vh] flex flex-col justify-center items-center space-y-4">
                        <div className={"font-bold font-['Helvetica'] text-4xl"}>Welcome to the Parato Demo</div>
                        <div className={"font-semibold font-['Helvetica'] text-xl text-neutral-600 flex space-x-2"}>
                            <button className={"text-indigo-600 hover:-translate-y-0.5 hover:text-indigo-300"}
                                    onClick={toggleDropdown}>
                                Configure integrations
                            </button>
                            <div>to begin</div>
                        </div>
                    </div>
                }
            </div>
            {user && <Footer></Footer>}
        </main>
    );
}
