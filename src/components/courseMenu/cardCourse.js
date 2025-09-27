import Image from "next/image";
import Link from "next/link";

// Section BUSINESS hiển thị 6 lĩnh vực dịch vụ với card có ảnh, badge và mô tả.
export default function BusinessSection({ content, order }) {
  // Chia 6 item thành hai hàng để dựng grid 3x2.
  const top = content.items.slice(0, 3);
  const bottom = content.items.slice(3);

  return (
    <section
      id="business"
      className={`p-4 bg-slate-50 md:p-10 ${order == 1 ? "md:pb-0" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-auto md:w-[85%]">
        <div className="max-w-4xl">
          <p className="text-4xl font-bold tracking-[0.2em] text-[#e60012]">
            {content.eyebrow}
          </p>

          <p className="mt-2 text-base leading-relaxed md:mt-4 text-slate-600">
            {content.description}
          </p>
        </div>

        {/* Hai hàng card, chia 3 phần để giữ bố cục cân đối trên desktop */}
        <div className="grid gap-6 mt-4 md:mt-10 md:grid-cols-3">
          {top.map((item) => (
            <BusinessCard key={item.id} item={item} />
          ))}
        </div>

        <div className="grid gap-6 mt-10 md:grid-cols-3">
          {bottom.map((item) => (
            <BusinessCard key={item.id} item={item} />
          ))}
        </div>

        {content.cta && (
          <div className="flex justify-center mt-0 md:mt-7">
            <Link
              href={`${content.ctaLink}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-900 px-8 py-3 text-sm font-semibold tracking-[0.2em] text-slate-900 transition-colors duration-150 hover:bg-slate-900 hover:text-white"
            >
              {content.cta}
              <span aria-hidden className="text-base">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Card từng dịch vụ: dùng anchor nội bộ để người dùng có thể share/scroll tới.
function BusinessCard({ item }) {
  return (
    <Link
      href={`${item.id}`}
      id={item.id}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_25px_80px_-40px_rgba(15,23,42,0.6)]"
    >
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={520}
          height={420}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-4 py-1 text-xs font-semibold tracking-[0.3em] text-slate-900">
          {item.badge}
        </span>
        <span className="absolute inline-flex items-center justify-center w-10 h-10 text-base text-white transition-colors duration-150 border rounded-full bottom-4 right-4 border-white/40 group-hover:border-white">
          →
        </span>
      </div>
      <div className="flex flex-col flex-1 gap-4 px-6 pt-6 pb-3">
        <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
        <div className="flex-1 text-sm leading-relaxed text-slate-600">
          {item.description}
        </div>
      </div>
    </Link>
  );
}
