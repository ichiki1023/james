/**
 * Created by satouitiki on 2017/03/23.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAnalytics } from '../../reducers/analytics';


class DefinitionResultTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      definitions,
      analyticsProps,
      result
    } = this.props;

    return <table className="striped">
          <thead>
          <tr>
            <th></th>
            { analyticsProps.map( (analytics, index) => {
              return <th key={index}>{analytics}</th>
            })
            }
          </tr>
          </thead>
          <tbody>
          { definitions.map((definition, index) => {
            return <tr key={index}>
              <td>{definition.url}</td>
              { analyticsProps.map((analytics) => {
                return result[analytics] !== undefined ?
                  (result[analytics] === true ? <td>◯</td> : <td>☓</td>)
                  : <td>-</td>
              })}
            </tr>
          })}
          </tbody>
        </table>
  }
}

DefinitionResultTable.propTypes = {
  definitions: PropTypes.array.isRequired,
  analyticsProps: PropTypes.array.isRequired,
  result: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  ...getAnalytics(state),
});

export default connect(mapStateToProps)(DefinitionResultTable);
