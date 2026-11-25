import { FiActivity, FiFileText, FiShield, FiTruck } from "react-icons/fi";

const ASSURANCES = [
  { icon: FiShield, label: "Janoshik Independent Testing" },
  { icon: FiActivity, label: "99%+ HPLC Verified Purity" },
  { icon: FiFileText, label: "Batch-Level Certificate of Analysis" },
  { icon: FiTruck, label: "Same-Day Tracked Dispatch" },
];

/** Dark four-point trust band shown above the footer on shop pages. */
export default function AssuranceStrip() {
  return (
    <section className="bg-espresso">
      <ul className="container-x grid grid-cols-1 gap-6 py-10 xs:grid-cols-2 lg:grid-cols-4 lg:py-12">
        {ASSURANCES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 text-cream">
            <Icon size={22} className="flex-none text-chartreuse" />
            <span className="font-serif text-[20px] leading-tight lg:text-[22px]">
              {label}
            </span>
          </li>
        ))}
      </ul>
      <p className="container-x border-t border-cream/10 py-4 text-[11px] uppercase tracking-[0.08em] text-cream/50">
        For laboratory R&amp;D use only. Not for human or veterinary
        consumption.
      </p>
    </section>
  );
}
