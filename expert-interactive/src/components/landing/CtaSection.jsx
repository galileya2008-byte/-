function CtaSection() {
  return (
    <section id="learning" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-8">
      <div className="rounded-premium border border-[#e8dccc] bg-white p-6 shadow-premium sm:p-8">
        <h2 className="text-2xl font-semibold text-espresso sm:text-3xl">
          Проблема не в том, что у вас нет клиентов. Часто проблема в том, что у клиента нет
          понятного пути к покупке.
        </h2>
        <p className="mt-4 max-w-4xl text-cocoa">
          Сайт, Pinterest, контент и оффер должны работать как единая система. Тогда внимание
          аудитории превращается не просто в просмотры, а в заявки и продажи.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#"
            className="rounded-xl bg-fuchsiaSoft px-5 py-3 font-semibold text-white transition hover:bg-[#a74f72]"
          >
            Хочу выстроить систему привлечения
          </a>
          <a
            href="#"
            className="rounded-xl border border-cocoa/30 px-5 py-3 font-medium text-cocoa transition hover:bg-cream"
          >
            Записаться на разбор
          </a>
          <a
            href="#"
            className="rounded-xl border border-cocoa/30 px-5 py-3 font-medium text-cocoa transition hover:bg-cream"
          >
            Перейти к обучению
          </a>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
