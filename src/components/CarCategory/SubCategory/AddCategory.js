import React from 'react';
import { Button } from '../../Component';

export default ({ submitAddCategory, setFile, setName, setPrice}) => (
    <form className="form-add-category" onSubmit={submitAddCategory} >
        <input className="form-add-category-input" type="text" placeholder="Name car" onChange={setName} />
        <input className="form-add-category-input" type="number" placeholder="Price car" onChange={setPrice} />
        <input type="file" onChange={setFile} />
        <Button val="เพิ่มสินค้า" color="#BB8FCE" borderBottom="#7D3C98" />
    </form>
)
