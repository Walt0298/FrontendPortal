const Home = () => (
  <>
    <div className="main_cards">
      <div className="card">
        <h1>Bienvenidos </h1>
        <img
          src="/logo.png"
          style={{ width: "50%", height: "50%" }}
        />
        {/* TODO: Add company somehow */}
      </div>
    </div>
    <style jsx>{`
      /* Layout for main content overview  and its cards*/
      .main_overview {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-bottom: 1px solid lightgreen;
      }
      .overview_card {
        flex-basis: 250px;
        flex-grow: 1;
        margin: 10px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        /* background-color: seagreen; */
        height: 100px;
        border: 1px solid darkblue;
        border-radius: 4px;
        color: darkblue;
      }
      /* Layout for main-cards section // below main_overview */
      .main_cards {
        margin: 10px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 500px 200px 300px;
        grid-template-areas:
          "card1"
          "card2"
          "card3";
        grid-gap: 10px;
      }
      .card {
        display:flex;
        flex-direction:column;
        padding: 20px;
        
        border-radius: 4px;
        color:black;
      }
      .card:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-area: card1;
      }
      .card:nth-child(2) {
        grid-area: card2;
      }
      .card:nth-child(3) {
        grid-area: card3;
      }
      /* responsive layout */
      @media only screen and (min-width: 750px) {
        .main_cards {
          margin: 10px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: 200px 300px;
          grid-template-areas:
            "card1 card2"
            "card1 card3";
          grid-gap: 10px;
        }
      }
    `}</style>
  </>
);

export default Home;
