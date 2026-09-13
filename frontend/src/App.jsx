import { useState } from "react";

const localityFeatures = [
  "agincourt south malvern west",
  "annex",
  "banbury don mills",
  "bay street corridor",
  "bayview woods steeles",
  "bedford park nortown",
  "beechborough greenbrook",
  "bendale",
  "birchcliffe cliffside",
  "blake jones",
  "briar hill belgravia",
  "bridle path sunnybrook york mills",
  "brookhaven amesbury",
  "cabbagetown south st james town",
  "cabbagetown south st. james town",
  "casa loma",
  "church yonge corridor",
  "clairlea birchmount",
  "clanton park",
  "corso italia davenport",
  "danforth",
  "dovercourt wallace emerson junction",
  "downsview roding cfb",
  "dufferin grove",
  "east end danforth",
  "edenbridge humber valley",
  "eglinton east",
  "elms old rexdale",
  "englemount lawrence",
  "eringate centennial west deane",
  "flemingdon park",
  "forest hill north",
  "forest hill south",
  "glenfield jane heights",
  "greenwood coxwell",
  "guildwood",
  "henry farm",
  "high park north",
  "high park swansea",
  "humber heights westmount",
  "humewood cedarvale",
  "islington city centre west",
  "junction area",
  "keelesdale eglinton west",
  "kensington chinatown",
  "kingsview village the westway",
  "l amoreaux",
  "l'amoreaux",
  "lambton baby point",
  "lansing westgate",
  "lawrence park north",
  "lawrence park south",
  "leaside bennington",
  "little portugal",
  "malvern",
  "maple leaf",
  "mimico",
  "moss park",
  "mount olive silverstone jamestown",
  "mount pleasant east",
  "mount pleasant west",
  "newtonbrook east",
  "niagara",
  "north riverdale",
  "north st james town",
  "north st. james town",
  "o connor parkview",
  "o'connor parkview",
  "oakwood village",
  "palmerston little italy",
  "parkwoods donalda",
  "pelmo park humberlea",
  "playter estates danforth",
  "regent park",
  "rexdale kipling",
  "rockcliffe smythe",
  "roncesvalles",
  "rosedale moore park",
  "rouge e11",
  "runnymede bloor west village",
  "south parkdale",
  "south riverdale",
  "st andrew windfields",
  "stonegate queensway",
  "tam o shanter sullivan",
  "tam o'shanter sullivan",
  "taylor massey",
  "the beaches",
  "thorncliffe park",
  "trinity bellwoods",
  "university",
  "waterfront communities c1",
  "waterfront communities c8",
  "waterfront communities the island",
  "west humber clairville",
  "westminster branson",
  "weston",
  "weston pellam park",
  "wexford maryvale",
  "willowdale east",
  "willowdale west",
  "willowridge martingrove richview",
  "woburn",
  "woodbine corridor",
  "wychwood",
  "yonge eglinton",
  "yonge st clair",
  "yonge st. clair",
  "yorkdale glen park",
];

const homeTypes = ["CONDO", "DUPLEX_TRIPLEX_FOURPLEX", "HOUSE"];
const initialForm = {
  latitude: "",
  longitude: "",
  beds: "",
  baths: "",
  area: "",
  locality: "annex",
  homeType: "HOUSE",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function buildPayload() {
    const payload = Object.fromEntries(
      ["latitude", "longitude", "beds", "baths", "area"].map((name) => [
        name,
        Number(form[name]),
      ]),
    );
    localityFeatures.forEach((feature) => {
      payload[feature] = feature === form.locality ? 1 : 0;
    });
    homeTypes.forEach((feature) => {
      payload[feature] = feature === form.homeType ? 1 : 0;
    });
    return payload;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to calculate the prediction.");
      setPrediction(data.prediction);
    } catch (requestError) {
      setError(
        requestError.message || "The prediction service is unavailable.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f9fd] text-[#143e90]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <header className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#187dc8]">
              Toronto / property intelligence
            </p>
            <p className=" max-w-xl text-base leading-relaxed text-[#143e90]/65 sm:text-lg">
              A clearer way to understand your Toronto property could be worth.
            </p>
          </div>
          <div className="hidden rounded-full border border-[#143e90]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#143e90]/70 sm:block">
            Model v1.0
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[0.7fr_1fr_0.72fr] lg:items-center">
          <h1 className="max-w-xs py-2 font-['Space_Grotesk'] text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-[#143e90] sm:text-6xl lg:sticky lg:top-8 lg:text-7xl">
            Find your home&apos;s worth.
          </h1>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-[#143e90] p-6 text-white shadow-2xl shadow-[#143e90]/20 sm:p-9"
          >
            <div className="mb-4 flex items-end justify-between border-b border-white/15 pb-5">
              <div>
                <p className="mb-1 text-sm text-white/65">Property Details</p>
                {/* <h2 className="font-['Space_Grotesk'] text-2xl font-semibold text-white">
                  The details that move the market.
                </h2> */}
              </div>
              <span className="text-sm text-white/65">01 / 01</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-medium text-white/75">
                  Locality
                </span>
                <select
                  name="locality"
                  value={form.locality}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base outline-none focus:border-[#187dc8] focus:bg-white/15 focus:ring-2 focus:ring-[#187dc8]/40"
                >
                  {localityFeatures.map((locality) => (
                    <option
                      className="text-[#24312b]"
                      key={locality}
                      value={locality}
                    >
                      {locality}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium text-white/75">
                  Home type
                </span>
                <select
                  name="homeType"
                  value={form.homeType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base outline-none focus:border-[#187dc8] focus:bg-white/15 focus:ring-2 focus:ring-[#187dc8]/40"
                >
                  {homeTypes.map((type) => (
                    <option className="text-[#24312b]" key={type} value={type}>
                      {type.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </label>
              {[
                ["beds", "Bedrooms", "e.g. 3"],
                ["baths", "Bathrooms", "e.g. 2"],
                ["area", "Area (sq ft)", "e.g. 1200"],
                ["latitude", "Latitude", "e.g. 43.6532"],
                ["longitude", "Longitude", "e.g. -79.3832"],
              ].map(([name, label, placeholder]) => (
                <label
                  key={name}
                  className={name === "area" ? "sm:col-span-2" : ""}
                >
                  <span className="mb-2 block text-sm font-medium text-white/75">
                    {label}
                  </span>
                  <input
                    required
                    name={name}
                    type="number"
                    step="any"
                    min={
                      name === "latitude"
                        ? "-90"
                        : name === "longitude"
                          ? "-180"
                          : "0"
                    }
                    max={
                      name === "latitude"
                        ? "90"
                        : name === "longitude"
                          ? "180"
                          : undefined
                    }
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-lg outline-none transition placeholder:text-white/35 focus:border-[#187dc8] focus:bg-white/15 focus:ring-2 focus:ring-[#187dc8]/40"
                  />
                </label>
              ))}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="mt-8 flex w-full items-center justify-between rounded-xl bg-[#187dc8] px-5 py-4 font-bold text-white transition hover:bg-[#2b91d8] disabled:cursor-wait disabled:opacity-60"
            >
              <span>
                {loading ? "Reading the market..." : "Estimate property value"}
              </span>
              <span aria-hidden="true" className="text-xl">
                ↗
              </span>
            </button>
          </form>

          <aside className="flex min-h-[320px] flex-col justify-between rounded-[2rem] border border-[#143e90]/10 bg-white p-7 shadow-xl shadow-[#143e90]/5 sm:p-9">
            <div>
              <p className="mb-12 text-xs font-bold uppercase tracking-[0.24em] text-[#187dc8]">
                Estimated market value
              </p>
              {prediction !== null ? (
                <p className="font-['Space_Grotesk'] text-5xl font-bold tracking-tight text-[#143e90] sm:text-6xl">
                  $
                  {Number(prediction).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
              ) : (
                <p className="max-w-xs font-['Space_Grotesk'] text-4xl font-semibold leading-tight text-[#143e90]">
                  Your estimate will appear here.
                </p>
              )}
              {error && (
                <p className="mt-5 rounded-lg bg-[#8d3f35]/15 p-3 text-sm font-medium text-[#6d2922]">
                  {error}
                </p>
              )}
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#143e90]/60">
              A live prediction from the trained Toronto housing model, routed
              through our local API.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default App;
