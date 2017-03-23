/**
 * Created by satouitiki on 2017/03/23.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import { getAnalytics } from '../../reducers/analytics';
import { changeCheckbox } from '../../actions/analytics';

class DefinitionInputTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      definitions,
      analyticsProps,
      check
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
              { analyticsProps.map((analytics, i) => {
                return <td key={i}>
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
  }
}

DefinitionInputTable.propTypes = {
  definitions: PropTypes.array.isRequired,
  analyticsProps: PropTypes.array.isRequired,
  check: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  ...getAnalytics(state),
});

const mapDispatchToProps = (dispatch) => ({
  check: (target, id) => {
    dispatch(changeCheckbox(target, id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DefinitionInputTable);
