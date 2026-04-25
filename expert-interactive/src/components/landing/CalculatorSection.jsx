import { useMemo, useState } from "react";
import { calculateMetrics, formatMoney } from "../../utils/calculator";

function InputField({ label, value, onChange, min, max, step = 1, suffix = "" }) {
  return (
    <div className="rounded-2xl border border-[#e6d9cd] bg-white p-4">
      <label className="mb-2 block text-sm font-medium text-cocoa">{label}</label>
      <div className="mb-2 flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          className="w-full rounded-xl border border-[#d9c8b8] px-3 py-2 text-base text-espresso outline-none focus:border-fuchsiaSoft"
        />
        {suffix ? <span className="text-sm text-cocoa/70">{suffix}</span> : null}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="w-full accent-fuchsiaSoft"
      />
    </div>
  );
}

function CalculatorSection() {
  const [traffic, setTraffic] = useState(1000);
  const [currentConversion, setCurrentConversion] = useState(1);
  const [averageCheck, setAverageCheck] = useState(5000);
  const [potentialConversion, setPotentialConversion] = useState(3);

  const metrics = useMemo(
    () =>
      calculateMetrics({
        traffic,
        currentConversion,
        averageCheck,
        potentialConversion,
      }),
    [traffic, currentConversion, averageCheck, potentialConversion]
  );

  const onNumberChange = (setter, fallback = 0) => (event) => {
    const value = Number(event.target.value);
    setter(Number.isFinite(value) ? value : fallback);
  };

  return (
    <section id="calculator" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8">
      <div className="rounded-premium border border-white/70 bg-white/65 p-6 shadow-premium backdrop-blur-sm sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-cocoa/60">Калькулятор</p>
        <h2 className="mt-2 text-3xl font-semibold text-espresso sm:text-4xl">
          Сколько клиентов и денег вы теряете без системы привлечения
        </h2>
        <p className="mt-3 max-w-3xl text-cocoa/85">
          Введите примерные данные - калькулятор покажет, сколько вы можете недополучать
          каждый месяц.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InputField
            label="Ежемесячные охваты / посещения"
            value={traffic}
            onChange={onNumberChange(setTraffic, 1000)}
            min={0}
            max={50000}
            step={100}
          />
          <InputField
            label="Текущая конверсия в заявку, %"
            value={currentConversion}
            onChange={onNumberChange(setCurrentConversion, 1)}
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Средний чек, руб."
            value={averageCheck}
            onChange={onNumberChange(setAverageCheck, 5000)}
            min={0}
            max={500000}
            step={500}
          />
          <InputField
            label="Потенциальная конверсия с системой, %"
            value={potentialConversion}
            onChange={onNumberChange(setPotentialConversion, 3)}
            min={0}
            max={100}
            step={0.1}
            suffix="%"
          />
        </div>

        <div className="mt-8 rounded-3xl bg-[#fff8f2] p-6">
          <p className="text-cocoa">
            Сейчас вы можете получать примерно:
            <span className="ml-1 font-semibold text-espresso">
              {metrics.currentLeads.toFixed(1)} заявок / {formatMoney(metrics.currentIncome)} в месяц
            </span>
          </p>
          <p className="mt-3 text-cocoa">
            С системой привлечения вы могли бы получать:
            <span className="ml-1 font-semibold text-espresso">
              {metrics.potentialLeads.toFixed(1)} заявок / {formatMoney(metrics.potentialIncome)} в
              месяц
            </span>
          </p>

          {metrics.monthlyLoss > 0 ? (
            <>
              <p className="mt-6 text-2xl font-semibold text-fuchsiaSoft sm:text-3xl">
                Вы можете терять примерно {formatMoney(metrics.monthlyLoss)} в месяц
              </p>
              <p className="mt-2 text-lg text-cocoa">
                За год это около <span className="font-semibold">{formatMoney(metrics.yearlyLoss)}</span>
              </p>
            </>
          ) : (
            <p className="mt-6 rounded-2xl border border-cocoa/20 bg-white p-4 text-cocoa">
              По введенным данным потери не рассчитаны. Попробуйте изменить конверсию или охваты,
              чтобы увидеть потенциал роста.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CalculatorSection;
