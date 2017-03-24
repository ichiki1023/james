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
      results
    } = this.props;

    const getResultDefinitions = () => {
      const r = [];
      definitions.map( definition => {
        const result = results[definition.url];
        r.push({
          result: result !== undefined ? result : {},
          ...definition
        });
      });
      return r;
    };

    const resultDefinitions = getResultDefinitions();

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
          { resultDefinitions.map((definition, index) => {
            return <tr key={index}>
              {
                Object.keys(definition.result).length !== 0 ? <td>{definition.url}</td>
                : <td style={{color: '#FF6900'}}>{definition.url}</td>
              }
              { analyticsProps.map((analytics) => {
                return definition.result[analytics] !== undefined ?
                  (definition.result[analytics] === true ? <td>◯</td> : <td style={{color: 'red'}}>☓</td>)
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
  results: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  ...getAnalytics(state),
});

export default connect(mapStateToProps)(DefinitionResultTable);
