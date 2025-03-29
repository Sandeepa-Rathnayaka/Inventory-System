import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error: fetchError } = await supabase
      .from('inventory_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error: createError } = await supabase
      .from('inventory_items')
      .insert([{ 
        item_name: body.item_name,
        weight_quantity: body.weight_quantity,
        quantity: body.quantity,
        description: body.description,
        company: body.company,
        ref_name: body.ref_name,
        contact_number: body.contact_number,
      }])
      .select();

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}