import React  from 'react';
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomePrincipal from "../components/Web/HomePrincipal";

/*-----------------------------*/
/* Home de la pagina web lo principal */
/*-----------------------------*/
export default function Home() {
 
return(
     <>
     <Helmet>
        <title>Michael Soro</title>
        <meta name="description" content="Home | Web sobre programación"  data-react-helmet="true"/>
     </Helmet>
        <MainBanner />
        <HomePrincipal />
    </>
    );

}
