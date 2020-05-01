import React from 'react';
import Logo from "../../../../assets/img/png/logoPersonal.png";
import SocialLink from "../../SocialLinks";
import "./MyInfo.scss";


export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={Logo} alt="Michael Soro" />
            <h4> Entra en el mundo del desarrollo web, disfruta creando proyectos de todo
            tipo, deja que tú imaginación fluya y crea verdaderas maravillas!!</h4>
            <SocialLink />
        </div>

    );
}
