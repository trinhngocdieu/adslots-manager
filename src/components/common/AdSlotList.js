import React from "react";
import { connect } from "react-redux";
import AdSlotElement from "./AdSlotElement";
import { Table, FormControl } from "react-bootstrap";

// I asume that we have only 4 types
const typeOptions = [1, 2, 3, 4];

export class AdSlotList extends React.Component {
  constructor(props) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onFilterType = this.onFilterType.bind(this);
    this.onFilterFormat = this.onFilterFormat.bind(this);

    this.getFormatOptions = this.getFormatOptions.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
    this.getTypeFilterResult = this.getTypeFilterResult.bind(this);
    this.getFormatFilterResult = this.getFormatFilterResult.bind(this);
    this.getDisplayAdSlots = this.getDisplayAdSlots.bind(this);
  }

  onSearch(e) {
    const { dispatch } = this.props;
    dispatch({
      type: 'ADSLOT_SEARCH_TEXT',
      data: e.target.value
    })
  }

  onFilterType(e) {
    const { dispatch } = this.props;
    dispatch({
      type: 'ADSLOT_TYPE_FILTER',
      data: e.target.value
    })
  }

  onFilterFormat(e) {
    const { dispatch } = this.props;
    dispatch({
      type: 'ADSLOT_FORMAT_FILTER',
      data: e.target.value
    })
  }

  getFormatOptions(adslots) {
    if (adslots.length > 0) {
      const formats = adslots.map(adslot => adslot.format);
      let uniqueFormats = [...new Set(formats)];
      return uniqueFormats;
    }
    return [];
  }

  getSearchResult(adslots, searchText) {
    const result =  adslots.filter(adslot =>
      // search by name or id
      adslot.id.toString().indexOf(searchText) !== -1
      || adslot.name.toLowerCase().indexOf(searchText) !== -1
    );
    return result;
  }

  getTypeFilterResult(adslots, typeFilter) {
    const result =  adslots.filter(adslot =>
      adslot.type.toString() === typeFilter.toString()
    );
    return result;
  }

  getFormatFilterResult(adslots, formatFilter) {
    const result =  adslots.filter(adslot =>
      adslot.format.toString() === formatFilter.toString()
    );
    return result;
  }

  getDisplayAdSlots (adslots, searchText, typeFilter, formatFilter) {
    if (adslots.length === 0) {
      return [];
    }

    let displayAdslots = adslots;

    if (searchText) {
      displayAdslots = this.getSearchResult(adslots, searchText.toLowerCase());
    }
    if (typeFilter !== 'all') {
      displayAdslots = this.getTypeFilterResult(displayAdslots, typeFilter);
    }
    if (formatFilter !== 'all') {
      displayAdslots = this.getFormatFilterResult(displayAdslots, formatFilter);
    }

    return displayAdslots;
  }

  render() {
    const { adslots, searchText, typeFilter, formatFilter } = this.props;

    const formatOptions = this.getFormatOptions(adslots);
    const displayAdslots = this.getDisplayAdSlots(adslots, searchText, typeFilter, formatFilter);

    return (
      <div>
        {/* Search Box */}
        <FormControl
          type="text"
          className="search-box"
          value={searchText}
          placeholder="Search adslot by name or id..."
          onChange={this.onSearch}
        />

        <Table bordered hover responsive striped>
          <thead>
            <tr>
              <th>ID</th>
              <th className="col-name">Name</th>

              <th>
                <FormControl className="filter"
                  componentClass="select"
                  onChange={this.onFilterType}
                  value={typeFilter}
                  placeholder="select">
                  <option value="all">All</option>

                  {
                    typeOptions.map((type, index) => {
                      return <option key={index} value={type}>{type}</option>
                    })
                  }
                </FormControl>
                <span>Type</span>
              </th>

              <th>Url</th>

              <th>
                <FormControl className="filter"
                  componentClass="select"
                  onChange={this.onFilterFormat}
                  value={formatFilter}
                  placeholder="select">
                  <option value="all">All</option>
                  {
                    formatOptions.map((format, index) => {
                      return <option key={index} value={format}>{format}</option>
                    })
                  }
                </FormControl>
                <span>Format</span>
              </th>

              <th>Price</th>
              <th>Fallback</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {displayAdslots.map((adslot, index) =>
              <AdSlotElement key={index} adslot={adslot} />
            )}
          </tbody>
        </Table>

        {/* No result */}
        {displayAdslots.length === 0 && <div>No result found.</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    adslots: state.adslots.data,
    searchText: state.adslots.searchText,
    typeFilter: state.adslots.typeFilter,
    formatFilter: state.adslots.formatFilter,
  };
}

export default connect(mapStateToProps)(AdSlotList);
