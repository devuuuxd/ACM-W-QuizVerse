export default function Hero() {
  return (
    <section className="mx-auto max-w-2xl px-4 pb-4 pt-6 text-center sm:px-6 md:pb-6 md:pt-10">
      {/* Eyebrow */}
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
        <span className="mr-2 inline-block w-5 border-t border-gray-300 align-middle" />
        Recruitment Challenge · Round 1
        <span className="ml-2 inline-block w-5 border-t border-gray-300 align-middle" />
      </p>

      {/* Heading */}
      <h1 className="mb-3 font-serif text-3xl font-medium tracking-tight text-navy md:text-[2.6rem] md:leading-tight">
        Test Your Knowledge
      </h1>

      {/* Subtitles */}
      <p className="text-sm leading-relaxed text-gray-600 md:text-[15px]">
        Ten questions on ACM-W&apos;s mission and the fundamentals of Artificial
        Intelligence.
      </p>
      <p className="mt-1 text-sm text-gray-400 md:text-[15px]">
        Answer <span className="italic font-medium text-navy/70">sharp</span>, answer{' '}
        <span className="italic font-medium text-navy/70">fast</span>.
      </p>
    </section>
  );
}
