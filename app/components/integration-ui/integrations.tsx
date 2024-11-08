"use client";

import { AuthenticatedConnectUser, paragon, SDK_EVENT } from "@useparagon/connect";
import Login from "@/app/components/integration-ui/login";
import React, { useCallback, useEffect, useState } from "react";
import { IIntegrationMetadata } from "@/node_modules/@useparagon/connect/dist/src/entities/integration.interface";
import useParagon from "@/app/hooks/useParagon";

interface ChildProps {
    user: AuthenticatedConnectUser | null,
    setUser: (user: AuthenticatedConnectUser | null) => void
}
const Integrations: React.FC<ChildProps> = (props) => {
  const [integrationMetadata, setIntegrationMetadata] = useState<Array<IIntegrationMetadata>>([]);
  const {paragonUser} = useParagon();

  useEffect(() => {
    if(sessionStorage.getItem("jwt") && paragonUser.authenticated){
      props.setUser(paragonUser);
    }
  }, [])

  useEffect(() => {
    setIntegrationMetadata(paragon.getIntegrationMetadata());
  }, [props.user]);

  console.log(props.user);
  console.log(integrationMetadata);

  if(props.user !== null ) {
      return (
          <div className={"flex flex-col w-1/2 p-4 space-y-2 z-10 bg-gray-50 border-2 border-gray-400 rounded-xl " +
              "absolute top-44 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
              <h1 className={"text-2xl font-['Helvetica'] font-bold"}>Integrations:</h1>
              <div className={"grid grid-cols-3 gap-4 justify-center"}>
                  {paragonUser?.authenticated && integrationMetadata.map((integration: IIntegrationMetadata) => {
                      const integrationEnabled = paragonUser.authenticated && paragonUser.integrations[integration.type]?.enabled;
                      return (
                          <div key={integration.type}
                               className={"col-span-1 flex space-x-2 border-2 border-gray-300 rounded-xl px-4 py-8 items-center " +
                                   "justify-between overflow-x-scroll"}>
                              <div className={"flex items-center space-x-2"}>
                                  <img src={integration.icon} style={{maxWidth: "30px"}}/>
                                  <p>{integration.name}</p>
                              </div>
                              <button
                                  className={integrationEnabled ? "text-white bg-green-800 p-2 rounded-xl hover:bg-blue-400" : "text-white bg-blue-700 p-2 rounded-xl hover:bg-blue-400"}
                                  onClick={() => paragon.connect(integration.type, {})}>
                                  {integrationEnabled ? "Manage" : "Enable"}
                              </button>
                          </div>
                      );
                  })}
              </div>
          </div>
      );
  } else {
      return (
          <div className={"flex justify-center absolute top-56 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2"}>
              <Login setUser={props.setUser}/>
          </div>
      );
  }
}
export default Integrations;