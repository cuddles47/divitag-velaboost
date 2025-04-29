import { COMPANIES_LOGOS, CompanyLogo as TCompanyLogo } from "@/shared/constants/store/homePage/companyLogos";
import CompanyLogo from "./CompanyLogo";

export const CompanyLogoList = () => {
  return (
    <div className="w-full mt-24 mb-12 md:mb-32 flex flex-col">
      <h2 className="text-2xl font-medium text-gray-700 text-center mb-10">Selected Brands</h2>
      <div className="flex justify-between items-center md:flex-row md:gap-0 flex-col gap-8">
        {COMPANIES_LOGOS.map((companyLogo: TCompanyLogo, idx: number) => (
          <CompanyLogo key={idx} {...companyLogo} />
        ))}
      </div>
    </div>
  );
};
