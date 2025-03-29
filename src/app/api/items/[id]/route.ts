import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const { data, error: supabaseError } = await supabase
      .from('inventory_items')
      .select('*')
      .eq('id', id)
      .single();

    if (supabaseError) {
      return NextResponse.json({ error: supabaseError.message }, { status: 500 });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const { data, error: supabaseError } = await supabase
      .from('inventory_items')
      .update({
        item_name: body.item_name,
        weight_quantity: body.weight_quantity,
        quantity: body.quantity,
        description: body.description,
        company: body.company,
        ref_name: body.ref_name,
        contact_number: body.contact_number,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (supabaseError) {
      return NextResponse.json({ error: supabaseError.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}