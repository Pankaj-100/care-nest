import ServiceTemplate from './ServiceTemplate';
import { allServicesData } from './data';

export default function Services() {
  return <ServiceTemplate serviceData={allServicesData.personalCare} />;
}