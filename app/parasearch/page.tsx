"use client";
import {useState} from "react";
import {AuthenticatedConnectUser} from "@useparagon/connect";
import Header from "@/app/components/header";
import Integrations from "@/app/components/integration-ui/integrations";
import SearchInput from "@/app/components/ui/search/search-input";
import SearchSection from "@/app/components/ui/search/search-section";

export default function Parasearch() {
    const [intgDropdown, setIntgDropdown] = useState<boolean>(false);
    const [user, setUser] = useState<AuthenticatedConnectUser | null>(null);

    function toggleDropdown(){
        setIntgDropdown(!intgDropdown);
    }

    return (
        <main className="pt-10 flex justify-center items-center background-gradient">
            <div className="flex-col space-y-2 lg:space-y-10 w-[90%] lg:w-[60rem]">
                <Header toggle = {toggleDropdown} setUser={setUser} toggleDown={intgDropdown} user={user}/>
                {intgDropdown && <Integrations user={user} setUser={setUser}/>}
                <div className="flex">
                    <SearchSection user={user}>
                    </SearchSection>
                </div>
            </div>
        </main>
    );
}