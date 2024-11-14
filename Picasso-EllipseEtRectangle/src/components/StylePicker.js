const StylePicker = ({ style, setStyle }) => (
  <div>
    <label style={{ display: "block" }}>Style:</label>
    <select value={style} onChange={(e) => setStyle(e.target.value)}>
      <option value="hollow">Hollow</option>
      <option value="filled">Filled</option>
    </select>
  </div>
);
export default StylePicker;
