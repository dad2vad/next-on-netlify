import React from "react";

import Firebase from "firebase";


class App extends React.Component {
  constructor(props) {
    super(props);
    if (!Firebase.apps.length) {
      Firebase.initializeApp({
  "apiKey":"AIzaSyDBo5gJ7GkaztJYpVTJEUmgPQMJU5N_eo8",
  "authDomain":"grob0t-628ae.firebaseapp.com",
  "databaseURL":"https://grob0t-628ae.firebaseio.com",
 
});
    }

    this.state = {
      developers: [],
            users: [],
      isLoading: false,
      isError: false
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    let url = this.refs.url.value;
    let role = this.refs.role.value;
    let uid = this.refs.uid.value;

    if (uid && name && role && url) {
      const { developers } = this.state;
      const devIndex = developers.findIndex(data => {
        return data.uid === uid;
      });
      developers[devIndex].name = name;
      developers[devIndex].url = url;
      developers[devIndex].role = role;
      this.setState({ developers });
    } else if (name && role && url) {
      const uid = new Date().getTime().toString();
      const { developers } = this.state;
      developers.push({ uid, name, role, url });
      this.setState({ developers });
    }
    this.refs.url.value = "";
    this.refs.name.value = "";
    this.refs.role.value = "";
    this.refs.uid.value = "";
  };

  removeData = developer => {
    const { developers } = this.state;
    const newState = developers.filter(data => {
      return data.uid !== developer.uid;
    });
    this.setState({ developers: newState });
  };

  updateData = developer => {
    this.refs.uid.value = developer.uid;
    this.refs.name.value = developer.name;
    this.refs.url.value = developer.url;
    this.refs.role.value = developer.role;
  };

  render() {
    const { developers } = this.state;
    return (
      <React.Fragment>
        <div className="container">

          <div className="row">
            <div className="col-xl-12">
              <h3>
                one{" "}
                <a href="/">
                  /HOME
                </a>
              </h3>
            </div>
          </div>


          <div className="row">
            <div className="col-xl-12">
              {developers.map(developer => (
                <div
                  key={developer.uid}
                  className="card float-left"
                  style={{ width: "18rem", marginRight: "1rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{developer.name}</h5>

               <a href={developer.url}>
                  /{developer.role}
                </a>
                    <button
                      onClick={() => this.removeData(developer)}
                      className="btn btn-link"
                    >
                      ❌
                    </button>
                    <button
                      onClick={() => this.updateData(developer)}
                      className="btn btn-link"
                    >
                      🅴
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div>  .
              <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <input type="hidden" ref="uid" />
                    <div className="form-group col-sm-6">

                      <input
                        type="text"
                        ref="name"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group col-sm-6">

                      <input
                        type="url"
                        ref="url"
                        className="form-control"
                        placeholder="url"
                      />
                    </div>

                    <div className="form-group col-sm-6">

                      <input
                        type="text"
                        ref="role"
                        className="form-control"
                        placeholder="Role"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
