import React from "react";
import { AiOutlineCheck } from "../../assets/icons";

const MyPlan = () => {
  return (
    <div>
      <div className="mx-auto max-w-2xl mt-16 mb-20 px-2">
        <h2 className="text-4xl font-bold mb-6">My Plan</h2>

        <div>
          <div className="text-left w-8/12 mb-4 lg:mb-0">
            <div className="bg-white py-3 mt-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#5e17eb] pb-3">
                Premium
              </h2>
              <p className="text-base font-medium text-black pb-4">
                Gerações ilimitadas de texto por IA Para indivíduos que desejam
                turbinar suas pesquisas e trabalho apodrecido
              </p>
              <div className="flex items-center mb-4">
                <h3 className="text-5xl font-bold mr-2">$32</h3>
                <p className="text-base font-medium text-black pb-0">
                  por mês <br></br> Faturado mensalmente
                </p>
              </div>
              <button className="bg-black py-2 text-white w-full rounded-lg hover:bg-[#5E17EB] border-0">
                Escolha Team
              </button>
              <div className="mt-4">
                <ul>
                  <li className="flex items-center mb-2">
                    <AiOutlineCheck className="text-[#5E17EB] mr-1" /> Tudo em
                    Pro, e:
                  </li>
                  <li className="flex items-center mb-2">
                    <AiOutlineCheck className="text-[#5E17EB] mr-1" /> Acesso
                    aos nossos modelos premium baseados
                  </li>
                  <li className="flex items-center mb-2">
                    <AiOutlineCheck className="text-[#5E17EB] mr-1" /> 4000
                    páginas / 150MB por upload
                  </li>
                  <li className="flex items-center mb-2">
                    <AiOutlineCheck className="text-[#5E17EB] mr-1" /> Acesso
                    antecipado a novas funcionalidades
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlan;
