import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (_) {
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
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

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (_) {
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}