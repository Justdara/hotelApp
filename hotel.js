const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const location = document.getElementById("location").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const adults = document.getElementById("adults").value;

  const locationResponse = await fetch(
    `https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_US&query=${location}&domain=US`,
    {
      method: "GET",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "2c8a23ae76msh0ccf4ceff16a810p1c2058jsn39267ef2f4e2",
        "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
      },
    }
  );

  const locationData = await locationResponse.json();
  const locationId = locationData.data[0].essId.sourceId;

  const hotelListResponse = await fetch(
    `https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?domain=US&sort_order=RECOMMENDED&locale=en_US&checkout_date=${checkout}&region_id=${locationId}&adults_number=${adults}&checkin_date=${checkin}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/octet-stream",
        "X-RapidAPI-Key": "2c8a23ae76msh0ccf4ceff16a810p1c2058jsn39267ef2f4e2",
        "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
      },
    }
  );
  const hotelListData = await hotelListResponse.json();
  console.log(hotelListData);
  const hotelsResult = document.getElementById("results");
  hotelsResult.innerHTML = "";
  hotelListData.properties.map((property) => {
    const hotelName = property.name;
    const poster = property.propertyImage.image.url;
    const hotel = `<li><img src = "${poster}"> <h1>${hotelName}</h1></li>`;

    document.querySelector("#results").innerHTML += hotel;
  });
});
