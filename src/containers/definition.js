import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import { getAnalytics } from '../reducers/analytics';
import { changeCheckbox, openBrowser } from '../actions/analytics';

class Definition extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      definitions,
      analyticsProps,
      check
    } = this.props;

    const requests = definitions.map( (definition) => {
       return definition.url;
    });

    return <div className="definition-window">
      <div className="definition-contents">
        <table className="striped">
          <thead>
          <tr>
            <th></th>
            { analyticsProps.map( (analytics) => {
              return <th>{analytics}</th>
            })
            }
          </tr>
          </thead>
          <tbody>
          { definitions.map((definition) => {
            return <tr>
              <td>{definition.url}</td>
              { analyticsProps.map((analytics) => {
                return <td>
                  <Input
                    type="checkbox"
                    value={analytics}
                    checked={definition.query.includes(analytics)}
                    onChange={e => {
                      check(e, definition.id);
                    }}
                    label=" "
                  />
                </td>
              })}
            </tr>
          })}
          </tbody>
        </table>
        <button onClick={ () => openBrowser(requests)}>実行</button>
      </div>
    </div>;
  }
}

Definition.propTypes = {
  definitions: PropTypes.array.isRequired,
  analyticsProps: PropTypes.array.isRequired,
  check: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  ...getAnalytics(state),
});

const mapDispatchToProps = (dispatch) => ({
  check: (target, id) => {
    dispatch(changeCheckbox(target, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Definition);


