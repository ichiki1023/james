import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'react-materialize';
import { getAnalytics } from '../reducers/analytics';
import { changeCheckbox, openBrowser } from '../actions/analytics';
import DefinitionInputTable from '../component/definition-input-table';
import DefinitionResultTable from '../component/definition-result-table';


class Definition extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      definitions,
      results,
      execute
    } = this.props;

    const requests = definitions.map( (definition) => {
       return definition.url;
    });

    return <div className="definition-window">
      <div className="definition-contents">
        <DefinitionInputTable {...this.props} />
      </div>
      <Button waves='light' onClick={ () => execute(requests)}>実行</Button>
      { Object.keys(results).length !== 0 ?
        <div className="definition-contents">
          <DefinitionResultTable  {...this.props} />
        </div>
      : null}
    </div>;
  }
}

Definition.propTypes = {
  definitions: PropTypes.array.isRequired,
  analyticsProps: PropTypes.array.isRequired,
  results: PropTypes.object.isRequired,
  check: PropTypes.func.isRequired,
  execute: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  ...getAnalytics(state),
});

const mapDispatchToProps = (dispatch) => ({
  check: (target, id) => {
    dispatch(changeCheckbox(target, id));
  },
  execute: (requests) => {
    dispatch(openBrowser(requests));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Definition);


