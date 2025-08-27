export default function MapLocation() {
    return (
      <section className="bg-[#F3EEE7] py-14 mt-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="bg-white rounded-md p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Location & Maps</h3>
                <p className="text-xs text-gray-600 mb-4">No 2201 Lorem Ipsum Dolor Sit Amet</p>
                <button className="px-4 py-2 rounded border text-xs text-black">VIEW LOCATION</button>
              </div>
              <div className="mt-6 text-xs text-gray-600 space-y-1">
                <div>(1300) 123 456 789</div>
                <div>email@email.com</div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div
                className="w-full h-64 md:h-72 bg-white rounded-md bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/🌎 Map Maker_ Monty Court, Norfolk, Virginia 23518, United States (WY).png')"
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }