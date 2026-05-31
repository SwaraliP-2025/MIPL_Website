import { Link } from "react-router-dom";
import { editorialServices, serviceDomains } from "@/data/miplEditorialServices";
import { ScrollFloat } from "@/components/ScrollFloat";

export const ServicesEditorialOverview = () => (
  <>
    <section className="bg-[#f8fafc] px-6 py-20 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#E9863C]">
          What we do
        </p>
        <h2 className="mb-4 text-3xl font-black text-[#0d1b3e] md:text-4xl">
          Security and IT consulting services
        </h2>
        <p className="mb-12 max-w-2xl text-slate-600">
          From safe city programmes to refinery security audits — structured consulting across
          planning, technology, and operations, with real project experience across India.
        </p>
        <div className="grid gap-8 lg:grid-cols-2">
          {editorialServices.map((svc, i) => (
            <ScrollFloat key={svc.id} strength={30 + i * 2}>
              <article className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm lg:flex-row">
                <div className="relative h-48 shrink-0 overflow-hidden bg-[#0d1b3e] lg:h-auto lg:w-44">
                  <img
                    src={svc.image}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-md"
                  />
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="relative z-10 h-full w-full object-cover object-center lg:object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e]/80 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col border-l-4 border-[#E9863C] p-6">
                  <h3 className="text-xl font-black text-[#0d1b3e]">{svc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{svc.layman}</p>
                  <ol className="mt-4 space-y-1.5 text-sm text-slate-700">
                    {svc.steps.map((step, j) => (
                      <li key={step} className="flex gap-2">
                        <span className="font-bold text-[#1565c0]">{j + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 text-xs text-slate-500">
                    <span className="font-semibold text-[#0d1b3e]">For:</span>{" "}
                    {svc.audiences.join(" · ")}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-[#E9863C]">e.g. {svc.example}</p>
                </div>
              </article>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>

    <section className="border-y border-[#0d1b3e]/10 bg-[#0d1b3e] py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.28em] text-[#E9863C]">
          Sectors we advise
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {serviceDomains.map((d) => (
            <span
              key={d}
              className="rounded-sm border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90"
            >
              {d}
            </span>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#E9863C] px-8 py-3 font-semibold text-white transition hover:bg-[#d67734]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  </>
);
